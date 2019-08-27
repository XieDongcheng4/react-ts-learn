import IAdminModel from "@model/i-admin-model";
import Axios from "@util/axios/axios";

export default class AdminApi {
    public static getAdmin = () => new Axios<IAdminModel>({url: '/api/AdminApi.json'}).ajax()
}