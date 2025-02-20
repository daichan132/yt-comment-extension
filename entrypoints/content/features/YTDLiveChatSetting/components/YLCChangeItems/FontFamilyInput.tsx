import { useShallow } from 'zustand/react/shallow'

import { useYLCFontFamilyChange } from '@/entrypoints/content/hooks/ylcStyleChange/useYLCFontFamilyChange'
import { useYTDLiveChatStore } from '@/shared/stores'

export const FontFamilyInput = () => {
  const { changeFontFamily } = useYLCFontFamilyChange()
  const { fontFamily, updateYLCStyle } = useYTDLiveChatStore(
    useShallow(state => ({
      fontFamily: state.fontFamily,
      updateYLCStyle: state.updateYLCStyle,
    })),
  )

  return (
    <FontFamilyInputUI
      value={fontFamily}
      onChange={event => {
        const fontFamily = event.target.value
        updateYLCStyle({ fontFamily })
        changeFontFamily(fontFamily)
      }}
    />
  )
}

export const FontFamilyInputUI = ({
  value,
  onChange,
}: {
  value: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}) => {
  return <input className='w-[145px] px-3 py-2 rounded-[2px] border border-black/10' value={value} onChange={event => onChange?.(event)} />
}
