'use client'
import type { FC } from 'react'
import React, { useState } from 'react'
import useSWR from 'swr'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import { createContext, useContext } from 'use-context-selector'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'
import { omit } from 'lodash-es'
import { OperationAction, StatusItem } from '../list'
import s from '../style.module.css'
import Completed from './completed'
import Embedding from './embedding'
import Metadata from './metadata'
import SegmentAdd, { ProcessStatus } from './segment-add'
import BatchModal from './batch-modal'
import style from './style.module.css'
import MermaidDiagram from '@/app/components/datasets/upload/diagram'
import cn from '@/utils/classnames'
import Divider from '@/app/components/base/divider'
import Loading from '@/app/components/base/loading'
import type { MetadataType } from '@/service/datasets'
import { checkSegmentBatchImportProgress, fetchDatasetDetail, fetchDocumentDetail, segmentBatchImport } from '@/service/datasets'
import { ToastContext } from '@/app/components/base/toast'
import type { DocForm } from '@/models/datasets'
import { useDatasetDetailContext } from '@/context/dataset-detail'
import FloatRightContainer from '@/app/components/base/float-right-container'
import useBreakpoints, { MediaType } from '@/hooks/use-breakpoints'

export const DocumentContext = createContext<{ datasetId?: string; documentId?: string; docForm: string }>({ docForm: '' })

type DocumentTitleProps = {
  extension?: string
  name?: string
  iconCls?: string
  textCls?: string
  wrapperCls?: string
}

export const DocumentTitle: FC<DocumentTitleProps> = ({ extension, name, iconCls, textCls, wrapperCls }) => {
  const localExtension = extension?.toLowerCase() || name?.split('.')?.pop()?.toLowerCase()
  return <div className={cn('flex items-center justify-start flex-1', wrapperCls)}>
    <div className={cn(s[`${localExtension || 'txt'}Icon`], style.titleIcon, iconCls)}></div>
    <span className={cn('font-semibold text-lg text-gray-900 ml-1', textCls)}> {name || '--'}</span>
  </div>
}

type Props = {
  datasetId: string
  documentId: string
}

const DocumentDetail: FC<Props> = ({ datasetId, documentId }) => {
  const router = useRouter()
  const { t } = useTranslation()

  const media = useBreakpoints()
  const isMobile = media === MediaType.mobile

  const { notify } = useContext(ToastContext)
  const { dataset } = useDatasetDetailContext()
  const embeddingAvailable = !!dataset?.embedding_available
  const [showMetadata, setShowMetadata] = useState(!isMobile)
  const [newSegmentModalVisible, setNewSegmentModalVisible] = useState(false)
  const [batchModalVisible, setBatchModalVisible] = useState(false)
  const [importStatus, setImportStatus] = useState<ProcessStatus | string>()
  const showNewSegmentModal = () => setNewSegmentModalVisible(true)
  const showBatchModal = () => setBatchModalVisible(true)
  const hideBatchModal = () => setBatchModalVisible(false)
  const resetProcessStatus = () => setImportStatus('')
  const checkProcess = async (jobID: string) => {
    try {
      const res = await checkSegmentBatchImportProgress({ jobID })
      setImportStatus(res.job_status)
      if (res.job_status === ProcessStatus.WAITING || res.job_status === ProcessStatus.PROCESSING)
        setTimeout(() => checkProcess(res.job_id), 2500)
      if (res.job_status === ProcessStatus.ERROR)
        notify({ type: 'error', message: `${t('datasetDocuments.list.batchModal.runError')}` })
    }
    catch (e: any) {
      notify({ type: 'error', message: `${t('datasetDocuments.list.batchModal.runError')}${'message' in e ? `: ${e.message}` : ''}` })
    }
  }
  const runBatch = async (csv: File) => {
    const formData = new FormData()
    formData.append('file', csv)
    try {
      const res = await segmentBatchImport({
        url: `/datasets/${datasetId}/documents/${documentId}/segments/batch_import`,
        body: formData,
      })
      setImportStatus(res.job_status)
      checkProcess(res.job_id)
    }
    catch (e: any) {
      notify({ type: 'error', message: `${t('datasetDocuments.list.batchModal.runError')}${'message' in e ? `: ${e.message}` : ''}` })
    }
  }

  const { data: documentDetail, error, mutate: detailMutate } = useSWR({
    action: 'fetchDocumentDetail',
    datasetId,
    documentId,
    params: { metadata: 'without' as MetadataType },
  }, apiParams => fetchDocumentDetail(omit(apiParams, 'action')))

  const { data: documentMetadata, error: metadataErr, mutate: metadataMutate } = useSWR({
    action: 'fetchDocumentDetail',
    datasetId,
    documentId,
    params: { metadata: 'only' as MetadataType },
  }, apiParams => fetchDocumentDetail(omit(apiParams, 'action')),
  )

  const backToPrev = () => {
    router.push(`/datasets/${datasetId}/documents`)
  }

  const isDetailLoading = !documentDetail && !error
  const isMetadataLoading = !documentMetadata && !metadataErr

  const embedding = ['queuing', 'indexing', 'paused'].includes((documentDetail?.display_status || '').toLowerCase())

  const handleOperate = (operateName?: string) => {
    if (operateName === 'delete')
      backToPrev()
    else
      detailMutate()
  }

  const { data: currentDataset } = useSWR({
    url: 'fetchDatasetDetail',
    datasetId,
  }, apiParams => fetchDatasetDetail(apiParams.datasetId))

  const diagram = `
    graph TD;
      A((Start Mobile App Development)) --> B[Phase 1: Beginner];
      B --> C{Learn Fundamentals};
      C --> D[Flutter/Dart Basics];
      C --> E[React Native/JavaScript Basics];
      C --> F[Git & Version Control];
      C --> G[Firebase Basics];
      C --> H[Milestone: Build Simple Apps];
      B --> I[Phase 2: Intermediate];
      I --> J{Advance UI/UX Skills};
      J --> K[Custom Widgets in Flutter];
      J --> L[React Hooks & Redux-Saga];
      J --> M[APIs: Dio & Axios];
      J --> N[State Management: Getx & Redux];
      J --> O[Milestone: Publish First App];
      I --> P{Master App Store Deployment};
      P --> Q[CI/CD Setup];
      P --> R[Publish to AppStore/PlayStore];
      P --> S[Milestone: Deploy Multiple Apps];
      I --> T[Phase 3: Advanced];
      T --> U{Backend & Advanced Features};
      U --> V[Firebase Firestore Integration];
      U --> W[Push Notifications];
      U --> X[Offline Functionality];
      U --> Y[Milestone: Real-time Sync & Offline Support];
      T --> Z{Optimization & Testing};
      Z --> AA[Performance Optimization];
      Z --> AB[Automated Testing];
      Z --> AC[Deeper CI/CD Exploration];
      Z --> AD[Milestone: Automated Testing & Delivery];
      T --> AE[Phase 4: Expert / Leadership];
      AE --> AF{Contribute & Lead};
      AF --> AG[Contribute to Open Source];
      AF --> AH[Mentor Others];
      AF --> AI{Advanced Architecture};
      AI --> AJ[Modular App Design];
      AI --> AK[Scalability & Maintainability];
      AF --> AL[Milestone: Lead a Team/Project];

      %% Correct clickable buttons
      click A "https://www.example.com/decide-to-make-pizza" "Step 1: Decide to make pizza";
      click B "https://www.example.com/buy-ingredients" "Step 2: Buy ingredients";
      click C "https://www.example.com/prepare-sauce" "Step 3: Prepare sauce";
      click D "https://www.example.com/roll-out-dough" "Step 4: Roll out dough";
      click E "https://www.example.com/add-toppings" "Step 5: Add cheese & toppings";
      click F "https://www.example.com/bake-pizza" "Step 6: Bake pizza";
      click G "https://www.example.com/enjoy-pizza" "Step 7: Enjoy your pizza!";
  `

  return (
    <DocumentContext.Provider value={{ datasetId, documentId, docForm: documentDetail?.doc_form || '' }}>
      <div className='flex flex-col h-full overflow-y-auto'>
        <div className='flex min-h-16 border-b-gray-100 border-b items-center p-4 justify-between flex-wrap gap-y-2'>
          <div onClick={backToPrev} className={'shrink-0 rounded-full w-8 h-8 flex justify-center items-center border-gray-100 cursor-pointer border hover:border-gray-300 shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08),0px_4px_6px_-2px_rgba(16,24,40,0.03)]'}>
            <ArrowLeftIcon className='text-primary-600 fill-current stroke-current h-4 w-4' />
          </div>
          <Divider className='!h-4' type='vertical' />
          <DocumentTitle extension={documentDetail?.data_source_info?.upload_file?.extension} name={documentDetail?.name} />
          <div className='flex items-center flex-wrap gap-y-2'>
            <StatusItem status={documentDetail?.display_status || 'available'} scene='detail' errorMessage={documentDetail?.error || ''} />
            {embeddingAvailable && documentDetail && !documentDetail.archived && (
              <SegmentAdd
                importStatus={importStatus}
                clearProcessStatus={resetProcessStatus}
                showNewSegmentModal={showNewSegmentModal}
                showBatchModal={showBatchModal}
              />
            )}
            <OperationAction
              scene='detail'
              embeddingAvailable={embeddingAvailable}
              detail={{
                name: documentDetail?.name || '',
                enabled: documentDetail?.enabled || false,
                archived: documentDetail?.archived || false,
                id: documentId,
                data_source_type: documentDetail?.data_source_type || '',
                doc_form: documentDetail?.doc_form || '',
              }}
              datasetId={datasetId}
              onUpdate={handleOperate}
              className='!w-[216px]'
            />
            <button
              className={cn(style.layoutRightIcon, showMetadata ? style.iconShow : style.iconClose)}
              onClick={() => setShowMetadata(!showMetadata)}
            />
          </div>
        </div>
        <div className='flex flex-row flex-1' style={{ height: 'calc(100% - 4rem)' }}>
          {isDetailLoading
            ? <Loading type='app' />
            : <div className={`h-full w-full flex flex-col overflow-y-auto ${embedding ? 'px-6 py-3 sm:py-12 sm:px-16' : 'pb-[30px] pt-3 px-6'}`}>
              {embedding
                ? <Embedding detail={documentDetail} detailUpdate={detailMutate} />
                : <Completed
                  embeddingAvailable={embeddingAvailable}
                  showNewSegmentModal={newSegmentModalVisible}
                  onNewSegmentModalChange={setNewSegmentModalVisible}
                  importStatus={importStatus}
                  archived={documentDetail?.archived}
                />
              }
            </div>
          }
          <FloatRightContainer showClose isOpen={showMetadata} onClose={() => setShowMetadata(false)} isMobile={isMobile} panelClassname='!justify-start' footer={null}>
            <Metadata
              docDetail={{ ...documentDetail, ...documentMetadata, doc_type: documentMetadata?.doc_type === 'others' ? '' : documentMetadata?.doc_type } as any}
              loading={isMetadataLoading}
              onUpdate={metadataMutate}
            />
          </FloatRightContainer>
        </div>
        <BatchModal
          isShow={batchModalVisible}
          onCancel={hideBatchModal}
          onConfirm={runBatch}
          docForm={documentDetail?.doc_form as DocForm}
        />

        <div className='border-b-gray-100 border-b p-4 gap-y-2'>
          {currentDataset && currentDataset.tags && currentDataset.tags?.some(tag => tag?.name === 'Roadmap') && (
            <>
              <div className='flex items-center justify-between gap-x-4'>
                {currentDataset.tags?.[0]?.name}
              </div>
              <MermaidDiagram chart={diagram} />
              <iframe
                src="http://167.172.87.130/chatbot/GyC8biGhNNDfFVSM"
                style={{ width: '100%', height: '100%', minHeight: '700px' }}
                frameBorder="0"
                allow="microphone"
              ></iframe>
            </>
          )}
        </div>
      </div>
    </DocumentContext.Provider>
  )
}

export default DocumentDetail
