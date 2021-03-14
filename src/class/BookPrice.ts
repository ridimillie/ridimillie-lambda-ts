import { getParsedCommandLineOfConfigFile } from 'typescript';
import {
    ServiceType_T,
    Platform_T,
    SubscribePrice,
    ServiceType,
} from '../types';
import { Platforms } from '../types';
export default class BookPrice {
    private title: string;
    private platform: Platforms;
    private price: Number;
    private redirectURL: String;
    private serviceType: ServiceType_T;

    constructor(
        title: string,
        platform: Platform_T,
        redirectURL: String,
        serviceType: ServiceType_T,
        price: Number
    ) {
        this.title = title;
        this.platform = platform;
        this.redirectURL = redirectURL;
        this.serviceType = serviceType;
        this.price = price;
    }
}
