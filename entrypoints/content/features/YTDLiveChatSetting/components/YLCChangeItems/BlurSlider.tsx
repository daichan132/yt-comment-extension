import React, { useCallback, useRef } from 'react'

import { useShallow } from 'zustand/react/shallow'

import { Slider } from '@/shared/components/Slider'
import { useInitializedSlider } from '@/shared/hooks/useInitializedSlider'
import { useYTDLiveChatStore } from '@/shared/stores'

export const BlurToSliderValue = (blur: number) => {
  return blur / 20
}
export const BlurSlider = () => {
  const blurRef = useRef(useYTDLiveChatStore.getState().blur)
  const { updateYLCStyle } = useYTDLiveChatStore(useShallow(state => ({ updateYLCStyle: state.updateYLCStyle })))
  const updateBlur = useCallback(
    (value: number) => {
      updateYLCStyle({ blur: Math.round(value * 20) })
    },
    [updateYLCStyle],
  )
  const { value, ref } = useInitializedSlider<HTMLDivElement>({
    initialValue: BlurToSliderValue(blurRef.current),
    onScrub(value) {
      updateBlur(value)
    },
  })
  return <BlurSliderUI value={value} ref={ref} />
}

export const BlurSliderUI = React.forwardRef<HTMLDivElement, { value: number }>(({ value }, ref) => {
  return <Slider value={value} ref={ref} />
})

BlurSliderUI.displayName = 'BlurSlider'
