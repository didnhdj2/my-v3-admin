module.exports = {
  extends: ['@commitlint/config-conventional'],

  rules: {
    //头信息的枚举
    'type-enum': [2, 'always', ['Update', 'New', 'Breaking', 'Docs', 'Build', 'Upgrade', 'Chor', 'Fix']],
    //头信息的大小写
    'type-case': [0, 'never'],

    'type-empty': [0],

    'scope-empty': [0, 'never'],

    'scope-case': [0, 'never'],

    'subject-full-stop': [0, 'never'],

    'subject-case': [0, 'never'],

    'header-max-length': [0, 'always', 72]
  }
}
