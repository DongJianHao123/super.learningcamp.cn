interface IUser {
    id: number
    phone: string
    wx?: string
    email?: string
    profile: {
        name: string
        avatar?: string
        age?: number
        gender: number // 0 女 1 男
        school?: string
        major?: string //专业
        company?: string //公司
        workState?: string //目前学习/工作状态
        grade?: string //具体年级/工作几年
        workPost?: string //工作岗位 ,前端，后端，运维。。。
        address?: string //具体地址，类似于收货地址
        githubName?: string
        province?: string
        city?: string
        interestRegion?: string
        tag?: string[]
        rank: 7 //社区影响力
    }
    invitorId: string,//邀请人Id或者邀请码
}