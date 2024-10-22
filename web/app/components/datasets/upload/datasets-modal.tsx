'use client'
import type { FC } from 'react'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import MermaidDiagram from './diagram'
import ReactRoadmap from '@/app/components/datasets/upload/roadmap'
import { initialNodes, initialEdges, mermaidDiagram } from '@/app/components/datasets/upload/roadmap-data'
import Modal from '@/app/components/base/modal'
import Button from '@/app/components/base/button'
import Dropdown from '@/app/components/base/dropdown'

type Props = {
  datasetId: string
  documentId: string
  name: string
  onClose: () => void
  onSaved: (datasetId: string) => void
}

const DatasetModal: FC<Props> = ({
  documentId,
  datasetId,
  name,
  onClose,
  onSaved,
}) => {
  const { t } = useTranslation()


  const renderTrigger = useCallback((open: boolean) => {
    return (
      <div
        className={`
        flex items-center px-[7px] h-7 rounded-md border-[0.5px] border-gray-200 shadow-xs
        text-xs font-medium text-gray-700 cursor-pointer
      `}
      >
        {t('common.menus.files')}
      </div>
    )
  }, [])

  return (
    <Modal
      title={t('common.menus.files')}
      isShow
      wrapperClassName='modal-wrapper'
      onClose={onClose}
    >
      <input disabled={true} className={'mt-2 w-full rounded-lg h-10 box-border px-3 text-sm leading-10 bg-gray-100'}
        value={name}
      />
      <Dropdown
        renderTrigger={renderTrigger}
        items={[
          {
            value: datasetId,
            text: datasetId,
          },
          {
            value: documentId,
            text: documentId,
          },
        ]}
        onSelect={item => onSaved(item.value as string)}
        popupClassName='z-[1003]'
      />
      <MermaidDiagram chart={mermaidDiagram} />
      <ReactRoadmap initialNodes={initialNodes} initialEdges={initialEdges} />

      <div className='mt-10 flex justify-end'>
        <Button variant='secondary' className='flex-shrink-0' onClick={onClose}>{t('common.operation.cancel')}</Button>
      </div>
    </Modal>
  )
}
export default React.memo(DatasetModal)
