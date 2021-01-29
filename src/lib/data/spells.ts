import type { SelectOption } from '../../components/Select'

export const spells = {
  '1': 'Cleanse',
  '3': 'Exhaust',
  '4': 'Flash',
  '6': 'Ghost',
  '7': 'Heal',
  '11': 'Smite',
  '12': 'Teleport',
  '13': 'Clarity',
  '14': 'Ignite',
  '21': 'Barrier',
  '39': 'Mark'
}

export const getSpellById = (id: keyof typeof spells): string => spells[id]

export const spellOptions: ReadonlyArray<SelectOption> = Object.entries(spells).map(
  ([value, label]) => ({
    label,
    value
  })
)
