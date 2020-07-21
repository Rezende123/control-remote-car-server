class Command {

    directionScaleMin = 0;
    directionScaleMax = 180;

    _velocity = 0;
    set velocity(velocity) {
        if (this.isValidInput(velocity)) {
            this._velocity = velocity;
        }
    }
    get velocity() { return this._velocity };

    _direction = 90;
    set direction(direction) {
        if (this.isValidInput(direction)) {
            this._direction = direction;
        } else {
            this._direction = 90;
        }
    }
    get direction() { return this._direction };
    
    updateCommand({ velocity, angle }) {
        this.velocity = velocity;
        this.direction = this.setDirectionByAngle(angle)
    }

    isValidInput(input) {
        return input != null && input != undefined && typeof input === 'number';
    }

    getCurrent() {
        return {
            velocity: this.velocity,
            direction: this.direction
        }
    }

    setDirectionByAngle(angle) {
        if (angle === null || angle === undefined) return null;

        const scale = (currentMin, currentMax, goalMin, goalMax, input) => {
            const percent = (input - currentMin) / (currentMax - currentMin);
            const output = percent * (goalMax - goalMin) + goalMin;
            return Math.round(output);
        };
        const max = (angle > 180) ? 181 : 180;
        const min = (angle > 180) ? 360 : 1;

        const direction = scale(
            min,
            max,
            this.directionScaleMin,
            this.directionScaleMax,
            angle
        );

        return direction;
    }
}

module.exports = Command;