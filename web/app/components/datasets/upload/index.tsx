'use client'
import type { FC } from 'react'
import React, { useMemo, useState } from 'react'
import useSWR from 'swr'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'
import { debounce, omit } from 'lodash-es'
import { PlusIcon } from '@heroicons/react/24/solid'
import List from './list'
import s from './style.module.css'
import Loading from '@/app/components/base/loading'
import Button from '@/app/components/base/button'
import Input from '@/app/components/base/input'
import Pagination from '@/app/components/base/pagination'
import { get } from '@/service/base'
import { fetchDocuments } from '@/service/datasets'
import { useDatasetDetailContext } from '@/context/dataset-detail'
import { DataSourceType } from '@/models/datasets'
// Custom page count is not currently supported.
const limit = 15

const FolderPlusIcon = ({ className }: React.SVGProps<SVGElement>) => {
  return <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className ?? ''}>
    <path d="M10.8332 5.83333L9.90355 3.9741C9.63601 3.439 9.50222 3.17144 9.30265 2.97597C9.12615 2.80311 8.91344 2.67164 8.6799 2.59109C8.41581 2.5 8.11668 2.5 7.51841 2.5H4.33317C3.39975 2.5 2.93304 2.5 2.57652 2.68166C2.26292 2.84144 2.00795 3.09641 1.84816 3.41002C1.6665 3.76654 1.6665 4.23325 1.6665 5.16667V5.83333M1.6665 5.83333H14.3332C15.7333 5.83333 16.4334 5.83333 16.9681 6.10582C17.4386 6.3455 17.821 6.72795 18.0607 7.19836C18.3332 7.73314 18.3332 8.4332 18.3332 9.83333V13.5C18.3332 14.9001 18.3332 15.6002 18.0607 16.135C17.821 16.6054 17.4386 16.9878 16.9681 17.2275C16.4334 17.5 15.7333 17.5 14.3332 17.5H5.6665C4.26637 17.5 3.56631 17.5 3.03153 17.2275C2.56112 16.9878 2.17867 16.6054 1.93899 16.135C1.6665 15.6002 1.6665 14.9001 1.6665 13.5V5.83333ZM9.99984 14.1667V9.16667M7.49984 11.6667H12.4998" stroke="#667085" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
}

const ThreeDotsIcon = ({ className }: React.SVGProps<SVGElement>) => {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className ?? ''}>
    <path d="M5 6.5V5M8.93934 7.56066L10 6.5M10.0103 11.5H11.5103" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
}

const EmptyElement: FC<{ canAdd: boolean; onClick: () => void; type?: 'upload' | 'sync' }> = ({ canAdd = true, onClick, type = 'upload' }) => {
  const { t } = useTranslation()
  return <div className={s.emptyWrapper}>
    <div className={s.emptyElement}>
      <div className={s.emptySymbolIconWrapper}>
        {type === 'upload' ? <FolderPlusIcon /> : <FolderPlusIcon />}
      </div>
      <span className={s.emptyTitle}>{t('datasetDocuments.list.empty.title')}<ThreeDotsIcon className='inline relative -top-3 -left-1.5' /></span>
      <div className={s.emptyTip}>
        {t(`datasetDocuments.list.empty.${type}.tip`)}
      </div>
      {type === 'upload' && canAdd && <Button onClick={onClick} className={s.addFileBtn}>
        <PlusIcon className={s.plusIcon} />{t('datasetDocuments.list.addFile')}
      </Button>}
    </div>
  </div>
}

type IUploadsProps = {
  datasetId: string
}

export const fetcher = (url: string) => get(url, {}, {})

const Uploads: FC<IUploadsProps> = ({ datasetId }) => {
  const { t } = useTranslation()
  const [searchValue, setSearchValue] = useState<string>('')
  const [currPage, setCurrPage] = React.useState<number>(0)
  const router = useRouter()
  const { dataset } = useDatasetDetailContext()
  const [timerCanRun, setTimerCanRun] = useState(true)
  const isDataSourceFile = dataset?.data_source_type === DataSourceType.FILE
  const embeddingAvailable = !dataset?.embedding_available

  const query = useMemo(() => {
    return { page: currPage + 1, limit, keyword: searchValue, fetch: '' }
  }, [searchValue, currPage])

  const { data: documentsRes, error, mutate } = useSWR(
    {
      action: 'fetchDocuments',
      datasetId,
      params: query,
    },
    apiParams => fetchDocuments(omit(apiParams, 'action')),
    { refreshInterval: (timerCanRun) ? 2500 : 0 },
  )

  const documentsWithProgress = useMemo(() => {
    let completedNum = 0
    let percent = 0
    const documentsData = documentsRes?.data?.map((documentItem) => {
      const { indexing_status, completed_segments, total_segments } = documentItem
      const isEmbeddinged = indexing_status === 'completed' || indexing_status === 'paused' || indexing_status === 'error'

      if (isEmbeddinged)
        completedNum++

      const completedCount = completed_segments || 0
      const totalCount = total_segments || 0
      if (totalCount === 0 && completedCount === 0) {
        percent = isEmbeddinged ? 100 : 0
      }
      else {
        const per = Math.round(completedCount * 100 / totalCount)
        percent = per > 100 ? 100 : per
      }
      return {
        ...documentItem,
        percent,
      }
    })
    if (completedNum === documentsRes?.data?.length)
      setTimerCanRun(false)
    return {
      ...documentsRes,
      data: documentsData,
    }
  }, [documentsRes])
  const total = documentsRes?.total || 0

  const routeToDocCreate = () => {
    router.push(`/datasets/${datasetId}/documents/create`)
  }

  const isLoading = !documentsRes && !error

  const documentsList = documentsRes?.data

  return (
    <div className='flex flex-col h-full overflow-y-auto'>
      <div className='flex flex-col justify-center gap-1 px-6 pt-4'>
        <h1 className={s.title}>{t('datasetDocuments.list.title')}</h1>
      </div>
      <div className='flex flex-col px-6 py-4 flex-1'>
        <div className='flex items-center justify-between flex-wrap'>
          <Input
            showLeftIcon
            wrapperClassName='!w-[200px]'
            className='!h-8 !text-[13px]'
            onChange={debounce(e => setSearchValue(e.target.value), 500)}
            value={searchValue}
          />
          <div className='flex gap-2 justify-center items-center !h-8'>
            {embeddingAvailable && (
              <Button variant='primary' onClick={routeToDocCreate} className='shrink-0'>
                <PlusIcon className='h-4 w-4 mr-2 stroke-current' />
                {isDataSourceFile && t('datasetDocuments.list.addFile')}
              </Button>
            )}
          </div>
        </div>
        {isLoading
          ? <Loading type='app' />
          : total > 0
            ? <List embeddingAvailable={embeddingAvailable} documents={documentsList || []} datasetId={datasetId} onUpdate={mutate} />
            : <EmptyElement canAdd={embeddingAvailable} onClick={routeToDocCreate} type={'upload'} />
        }
        {/* Show Pagination only if the total is more than the limit */}
        {(total && total > limit)
          ? <Pagination current={currPage} onChange={setCurrPage} total={total} limit={limit} />
          : null}
      </div>
    </div>
  )
}

export default Uploads
