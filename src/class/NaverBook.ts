import { Platform_T } from '../types';
import { Platforms } from '../types';
export default class NaverBook {
    private platform: Platforms;
    private price: Number;
    private redirectURL: String;
    private serviceType: String;

    constructor(platform: Platform_T, redirectURL: String, price: Number) {
        this.platform = platform;
        this.redirectURL = redirectURL;
        this.price = price;
        this.serviceType = 'purchase';
    }
}
