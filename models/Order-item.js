import  moment from 'moment'
class OrderItem {
    constructor(id, item, Amount, Date) {
        this.id = id;
        this.item = item;
        this.Amount = Amount;
        this.Date = Date;
    }
    get readableDate() {
        return moment(this.Date).format('MMMM Do YYYY, hh:mm');
    }
}
export default OrderItem;