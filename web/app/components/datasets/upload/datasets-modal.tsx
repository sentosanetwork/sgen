'use client'
import type { FC } from 'react'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import MermaidDiagram from './diagram'
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

  const diagram = `
    graph TD
      A((Start Mobile App Development)) --> B[Phase 1: Beginner]
      
      B --> C{Learn Fundamentals}
      C --> D[Flutter/Dart Basics]
      C --> E[React Native/JavaScript Basics]
      C --> F[Git & Version Control]
      C --> G[Firebase Basics]
      C --> H[Milestone: Build Simple Apps]

      B --> I[Phase 2: Intermediate]
      I --> J{Advance UI/UX Skills}
      J --> K[Custom Widgets in Flutter]
      J --> L[React Hooks & Redux-Saga]
      J --> M[APIs: Dio & Axios]
      J --> N[State Management: Getx & Redux]
      J --> O[Milestone: Publish First App]

      I --> P{Master App Store Deployment}
      P --> Q[CI/CD Setup]
      P --> R[Publish to AppStore/PlayStore]
      P --> S[Milestone: Deploy Multiple Apps]

      I --> T[Phase 3: Advanced]
      T --> U{Backend & Advanced Features}
      U --> V[Firebase Firestore Integration]
      U --> W[Push Notifications]
      U --> X[Offline Functionality]
      U --> Y[Milestone: Real-time Sync & Offline Support]

      T --> Z{Optimization & Testing}
      Z --> AA[Performance Optimization]
      Z --> AB[Automated Testing]
      Z --> AC[Deeper CI/CD Exploration]
      Z --> AD[Milestone: Automated Testing & Delivery]

      T --> AE[Phase 4: Expert / Leadership]
      AE --> AF{Contribute & Lead}
      AF --> AG[Contribute to Open Source]
      AF --> AH[Mentor Others]
      AF --> AI{Advanced Architecture}
      AI --> AJ[Modular App Design]
      AI --> AK[Scalability & Maintainability]
      AF --> AL[Milestone: Lead a Team/Project]
  `

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
      <MermaidDiagram chart={diagram} />

      <div className='mt-10 flex justify-end'>
        <Button variant='secondary' className='flex-shrink-0' onClick={onClose}>{t('common.operation.cancel')}</Button>
      </div>
    </Modal>
  )
}
export default React.memo(DatasetModal)
