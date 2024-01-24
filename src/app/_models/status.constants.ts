export enum statusEnum {
    ACTIVE = 'ACTIVE',
    NOT_IN_USAGE = 'NOT_IN_USAGE',
    ARCHIVED = 'ARCHIVED',
    DRAFT = 'DRAFT'
}

export const statusNames: { [k in statusEnum]: string } = {
    [statusEnum.ACTIVE]: 'Active',
    [statusEnum.NOT_IN_USAGE]: 'Unused',
    [statusEnum.ARCHIVED]: 'Archived',
    [statusEnum.DRAFT]: 'Draft'
}
