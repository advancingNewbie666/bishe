import Sequelize from 'sequelize'
const config = {
	database:'test',
	user: 'root',
	pwd: '123456'
}
const sequelize = new Sequelize(config['database'], config['user'], config['pwd'], {host:'192.168.1.108',dialect: 'mysql'})
sequelize.authenticate().then(() => {
    console.log('数据库连接成功...')
}).catch(err => {console.error('数据库连接失败...', err)})
module.exports = sequelize