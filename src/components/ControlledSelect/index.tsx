import { Controller, useFormContext } from 'react-hook-form'

import type { SelectOption } from '../Select'
import { Select } from '../Select'

export interface ControlledSelectProps {
  readonly clearable?: boolean
  readonly isInvalid: boolean
  readonly name: string
  readonly options: ReadonlyArray<SelectOption>
  readonly searchable?: boolean
}

export const ControlledSelect: React.FC<ControlledSelectProps> = ({
  clearable = false,
  isInvalid,
  name,
  options,
  searchable = false
}) => {
  const { control } = useFormContext()
  return (
    <Controller
      id={name}
      styles={{
        container: (defaultStyles: any) =>
          isInvalid
            ? { ...defaultStyles, border: '1px solid red', borderRadius: '4px' }
            : defaultStyles
      }}
      placeholder="Select a champion"
      name={name}
      control={control}
      options={options}
      isSearchable={searchable}
      isClearable={clearable}
      as={Select}
    />
  )
}

ControlledSelect.displayName = 'ControlledSelect'
