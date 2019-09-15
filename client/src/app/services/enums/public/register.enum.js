import LocalizeKey from '../../constants/localize'

const REGISTER_ENUM = {}

REGISTER_ENUM['CITY'] = [
    {
        value: 1,
        text: LocalizeKey.REGISTER_ENUM_CITY_HA_NOI
      },
      {
        value: 2,
        text: LocalizeKey.REGISTER_ENUM_CITY_HCM
      },
]

REGISTER_ENUM['BRANCH'] = [
    {
        value: 1,
        text: [
            {
                value:1,
                text: LocalizeKey.REGISTER_ENUM_BRANCH_HA_NOI_1
            },
            {
                value:2,
                text: LocalizeKey.REGISTER_ENUM_BRANCH_HA_NOI_2
            },
        ]
    },
    {
        value: 2,
        text: [
            {
                value:1,
                text: LocalizeKey.REGISTER_ENUM_BRANCH_HCM_1
            },
            {
                value:2,
                text: LocalizeKey.REGISTER_ENUM_BRANCH_HCM_2
            },
        ]
    },
]

export default REGISTER_ENUM