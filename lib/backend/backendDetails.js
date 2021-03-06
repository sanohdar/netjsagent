/**
 * Created by Siddhant on 22-09-2015.
 */
var util = require('../util');

function BackendDetails(){
    this.BackendName;

    this.minDuration = Number.MAX_VALUE;
    this.maxDuration = 0;

    this.sumDuration = 0;
    this.avgDuration = 0;


    this.cumCount = 0;
    this.errorCumCount = 0;
    this.invocationCount = 0;
    this.errorInvocationCount = 0;

    this.rate = 0;
    //this.errorRate = 0;
}

/*
BackendDetails.prototype.create5record = function (BackendName,backendID ) {
    return '5' + ',' + this.BackendName + ',' + this.backendID +"\n";
}
*/


BackendDetails.prototype.createBackendRecord = function (status,duration,backendName,backendID) {
    this.BackendName = backendName;
    this.backendID = backendID;

    this.commonCalculation(status,duration);

}

BackendDetails.prototype.updateBackendDetails = function (status,duration) {

    this.commonCalculation(status,duration);
}

BackendDetails.prototype.commonCalculation = function(status,duration){
    try {
        if (status >= 400){
			this.errorCumCount = this.errorCumCount + 1;
            this.errorInvocationCount = this.errorInvocationCount + 1;
        } 
            if (duration < this.minDuration) {
                this.minDuration = duration;
            }
            if (duration > this.maxDuration) {
                this.maxDuration = duration;
            }

            this.cumCount = this.cumCount + 1;
            this.invocationCount = this.invocationCount + 1;

            this.sumDuration = this.sumDuration + duration;
            this.avgDuration = this.sumDuration / this.invocationCount;

    }catch(err){
        util.logger.warn("Error while making backend details : "+err);
    }

        return this;
}


module.exports = BackendDetails;
