const { DataTypes, UUIDV4, QueryTypes } = require('sequelize');
const model = require('./model');
const {v4 : uuidv4} = require('uuid');
const sq = require('../../config/sq')


class Controller {
    static async create(req, res){
        const { firstname, lastname, email, phonenumber, purpose, message } = req.body;
        const id = uuidv4()
        console.log(message)
       let create =  await model.create({id : id, firstname, lastname, email, phonenumber, purpose, message})
       if (create) {
        res.status(200).json({status : 200, message : 'data sukses dbuat'});
       } else {
        res.status(500).json({status : 201, message : 'data gagal dibuat'});
       }
    }

    static async list(req, res){
        try {
            let hasil = sq.query('SELECT * from usersData ud where deletedAt is null', {type : QueryTypes.SELECT})
            res.status(200).json({status : 200, message : 'data sukses diambil', data : hasil})
        } catch (error) {
            res.status(500).json({status : 500, message :'error', data : error})
        }
    }

    static async listByFirstname(req, res){
        try {
            const {firstname} = req.body
            let hasil = sq.query('SELECT * FROM usersData ud where deleteAt is null and firstname = ?',{
                replacements : [firstname],  
                type : QueryTypes.SELECT})
            res.status(200).json({status : 200, message : 'data sukses diambil', data : hasil})
        } catch (error) {
            res.status(500).json({status : 500, message, data : error})
        }
    }

    static async deletebyfirstname(req, res){
        const{firstname} = req.body
        let hasil = model.destroy({where : { firstname }})
        res.status(200).json({status : 200, message : 'data sukses dihapus', data : hasil})
    } catch (error) {
        res.status(500).json({status : 500, message : 'data data gagak dihapus', data : error})
    }
}


module.exports = Controller