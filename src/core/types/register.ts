export interface IRegistration {
    clientId?: string
    campId?: number
    configs: {
        company?: string
        channel?: string
        goodAt?: string[]
        grade?: string
        interestRegion?: string
        major?: string
        region?: string[]
        school?: string
        suggestion?: string
        workState?: string
        githubName?: string
        desire?: string,
    }
    createAt?: number,
    desire?: string,
    email?: string,
    gender?: number,
    invitationFrom?: string,
    invitationCode?: string,
    name?: string,
    phone: string,
    status?: number,
    updateAt?: number,
    userId?: number
}

export interface ICheckRegistered {
    campId: number
    client: string
    phone: string
}