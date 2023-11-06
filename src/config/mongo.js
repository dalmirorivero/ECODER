import { connect } from 'mongoose';

export default class MongoConnect {
    static count = 0;
    constructor(link) {
        this.link = link;
        ++MongoConnect.count;
        if (typeof MongoConnect.instance === "object") {
            return MongoConnect.instance;
        } else {
            MongoConnect.instance = this;
            return this;
        }
    }
    async connect_mongo() {
        connect(this.link)
            .then(() => console.log("DB OK!"))
            .catch((err) => console.log(err));
    }
};