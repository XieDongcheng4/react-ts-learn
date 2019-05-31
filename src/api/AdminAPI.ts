import IAdminModel from "@model/IAdminModel";
import Axios from "@util/axios/Axios";

export default class AdminAPI {
    public static getAdmin = () => new Axios<IAdminModel>({url: '/api/Admin.json'}).ajax()
}
