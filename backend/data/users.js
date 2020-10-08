import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123455', 10),
        isAdmin: true
    },
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: bcrypt.hashSync('123455', 10),
    },
    {
        name: 'Jane Dow',
        email: 'Jane@example.com',
        password: bcrypt.hashSync('123455', 10),
    },
]

export default users