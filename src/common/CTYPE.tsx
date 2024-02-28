export const CTYPE = {
    genders: {
        MALE: { value: 1, label: '男' },
        FEMALE: { value: 0, label: '女' }
    },
    accountType: { mobile: 1, wx: 2 },
    replayType: { video: 1, live: 2 },
}

export const requiredRule = [{ required: true, message: '请填写此项' }];

export const enum TAB_VALUES {
    INTRO = 'intro',
    TEXTBOOK = 'textbook',
    PLAYBACK = 'playback',
    STUDENTS = 'student',
    TEAM = 'team'
}

export const enum RegisterStatus {
    REGISTER = 1,
    IMPROVE_INFO = 2,
    SHARE = 3
}
export const phoneRule = /^(\+86|86)?1[3-9]\d{9}$|^(\+886|0)9\d{8}$/
export const emailRule = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const passwordRule = /^(?=.*[a-zA-Z\d\W_]).{6,}$/

