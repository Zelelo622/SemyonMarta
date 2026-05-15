export type SlideName =
  | 'cover'
  | 'date'
  | 'story'
  | 'venue'
  | 'program'
  | 'dress'
  | 'details'
  | 'rsvp'
  | 'contacts'

export interface SlideProps {
  visible: boolean
}

export type DrinkValue =
  | 'wine'
  | 'champagne'
  | 'vodka'
  | 'cognac'
  | 'whiskey'
  | 'didrovka'
  | 'nonalc'

export type GuestType = 'adult' | 'child'
export type YesNo = 'yes' | 'no'
export type YesNone = 'yes' | 'none'

export interface GuestForm {
  name: string
  guestType: GuestType
  attend: YesNo
  drinks: DrinkValue[]
  allergies: YesNone
  allergyDetails: string
  accommodation: YesNone
  transfer: YesNone
  transferAddress: string
}

export interface RSVPForm {
  guests: GuestForm[]
}
