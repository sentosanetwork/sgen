'use client'
import type { FC } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import React, { useEffect, useState } from 'react'
import { useAppContext } from '@/context/app-context'
import Uploads from '@/app/components/datasets/upload'
import { fetchDatasets } from '@/service/datasets'

const Layout: FC = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { isCurrentWorkspaceDatasetOperator } = useAppContext()
  const [datasetId, setDatasetId] = useState<string>('')

  useEffect(() => {
    (async () => {
      if (!datasetId) {
        const { data: datasets } = await fetchDatasets({ url: '/datasets', params: { page: 1 } })
        if (datasets && datasets.length) {
          const roadmapDataset = datasets.find(dataset =>
            dataset.tags?.some(tag => tag?.name === 'Roadmap'),
          )
          const _id = roadmapDataset ? roadmapDataset.id : datasets[0]?.id
          setDatasetId(_id)
        }
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined')
      document.title = `${t('common.menus.files')}`
    if (isCurrentWorkspaceDatasetOperator)
      return router.replace('/datasets')
  }, [isCurrentWorkspaceDatasetOperator, router, t])

  useEffect(() => {
    if (isCurrentWorkspaceDatasetOperator)
      return router.replace('/datasets')
  }, [isCurrentWorkspaceDatasetOperator, router])

  return <Uploads datasetId={datasetId} />
}
export default React.memo(Layout)
