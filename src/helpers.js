const hbsHelpers = {
  compare: (lvalue, rvalue, options) => {
    if (arguments.length < 3) {
      throw new Error("Handlebars Helper 'compare' needs 2 parameters")
    }

    const operator = options.hash.operator || '==='

    const operators = {
      '===': (l, r) => {
        return l === r
      },
      '!=': (l, r) => {
        return l !== r
      },
      '<': (l, r) => {
        return l < r
      },
      '>': (l, r) => {
        return l > r
      },
      '<=': (l, r) => {
        return l <= r
      },
      '>=': (l, r) => {
        return l >= r
      }
    }

    const result = operators[operator](lvalue, rvalue)

    if (result) {
      return options.fn(this)
    } else {
      return options.inverse(this)
    }
  }
}

export default hbsHelpers
