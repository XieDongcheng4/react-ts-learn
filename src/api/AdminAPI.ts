import IAdminModel from "@model/IAdminModel";
import IAxios from "@util/axios/IAxios";

export default class AdminAPI {
    public static getAdmin = () => new IAxios<IAdminModel>({url: '/api/Admin.json'}).ajax()
}
