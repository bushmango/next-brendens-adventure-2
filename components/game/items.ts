export interface IItem {
  id: string
  equippable?: boolean
  isEquipped?: boolean
}

export function initItems() {
  let items: IItem[] = [
    {
      id: 'error',
    },
    {
      id: 'shield',
      equippable: true,
      isEquipped: false,
    },
    {
      id: 'wooden sword',
      equippable: true,
      isEquipped: false,
    },
  ]

  return items
}
