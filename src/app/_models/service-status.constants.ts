export enum serviceStatusEnum {
    GREEN = 'GREEN',
    YELLOW = 'YELLOW',
    BLACK = 'BLACK',
    RED = 'RED',
    BLUE = 'BLUE',
    OUT_OF_SERVICE = 'OUT_OF_SERVICE'
}

export const serviceStatusNames: { [k in serviceStatusEnum]: string } = {
    [serviceStatusEnum.GREEN]: 'Норма',
    [serviceStatusEnum.YELLOW]: 'Деградация',
    [serviceStatusEnum.RED]: 'Отказ',
    [serviceStatusEnum.BLUE]: 'Профилактика',
    [serviceStatusEnum.BLACK]: 'Недоступен',
    [serviceStatusEnum.OUT_OF_SERVICE]: 'Не работает',
}
