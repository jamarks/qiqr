
import db from '../../utils/db';
import { getSession } from 'next-auth/client'


function findEmail(arr,email){
    //console.log('Busco ' + email)
    var retorno
    arr.map(data=>{
        var d = data.data()
        
        if(d.email == email){
            retorno =  data.id
            //console.log('Encontrado', retorno)
        }
    })
    return retorno
}
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
     var arrUsers = []
     var arrUser = []

    const user = await db.collection('user').get()
    const users = await db.collection('users').get()
    var cantidad = 0
    // users es interno
    // user es mio


    Promise.all([user, users]).then(values => {
        arrUser = values[0].docs
        arrUsers = values[1].docs
        

      arrUser.map(
        item => {
                var itemUser = item.data()
                if(!itemUser.internalId){
                    var id = findEmail(arrUsers,itemUser.email)
                    console.log('a' + item.id + ' - '+ itemUser.email +' le pongo como internalID: ' + id)
                    if(id){
                        const docUpdate =  db.collection('user').doc(item.id).update({'internalId':id});
                        console.log('Updated')
                        cantidad ++ 

                    }
            }
         }
  );
    })
    res.status(200).json({ message: cantidad + ' actualizados' });
}