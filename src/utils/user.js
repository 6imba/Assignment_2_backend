import bcrypt from 'bcrypt'

const hashPassword = async (password) => await bcrypt.hash(password,10)

const comparePassword = async (reqPass,hashPass) => await bcrypt.compare(reqPass,hashPass)

export {hashPassword,comparePassword}