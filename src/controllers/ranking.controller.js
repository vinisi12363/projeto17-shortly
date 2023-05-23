import rankingService from '../services/ranking.service.js'

export const  getUrlRanking = async (req, res) => {
    try {
        const  result = await rankingService.getRanking();
        if(result){
            res.status(200).send(result.rows)
        } else {
            res.status(400).send('error in get ranking')
        }

    }catch (err){
        res.status(500).send(err.message)
    }


}

export default {getUrlRanking}