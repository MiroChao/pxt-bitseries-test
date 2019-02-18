enum GrovePort {
    //% block="P0"
    P0,
    //% block="P1"
    P1,
    //% block="P2"
    P2,
    //% block="P8"
    P8,
    //% block="P16"
    P16
}

enum AnalogPort {
    //% block="P0"
    P0,
    //% block="P1"
    P1,
    //% block="P2"
    P2
}

enum DistanceUnit {
    //% block="cm"
    cm,
    //% block="inch"
    inch
}

/**
 * Provides access to BitTest blocks for micro: bit functionality.
 */
//% color=190 icon="\uf126" block= "BitTest"
//% groups="['Analog', 'Digital', 'I2C', 'Grove Modules']"
namespace BitTest {
    export class dosomthing {
        grove: GrovePort;
        analogIO: AnalogPort;
        unit: DistanceUnit;
        Din: number;
        Dout: number;
        high: boolean;
        Ain: number;
        Aout: number;
        select_grove_port(isReadWrite: boolean) {
            if (isReadWrite == true) {
                if (this.grove == GrovePort.P0) {
                    this.Din = pins.digitalReadPin(DigitalPin.P0);
                } else if (this.grove == GrovePort.P1) {
                    this.Din = pins.digitalReadPin(DigitalPin.P1);
                } else if (this.grove == GrovePort.P2) {
                    this.Din = pins.digitalReadPin(DigitalPin.P2);
                } else if (this.grove == GrovePort.P8) {
                    this.Din = pins.digitalReadPin(DigitalPin.P8);
                } else if (this.grove == GrovePort.P16) {
                    this.Din = pins.digitalReadPin(DigitalPin.P16);
                }
            } else if (isReadWrite == false) {
                if (this.high == true) {
                    this.Dout = 1;
                } else {
                    this.Dout = 0;
                }
                if (this.grove == GrovePort.P0) {
                    pins.digitalWritePin(DigitalPin.P0, this.Dout);
                } else if (this.grove == GrovePort.P1) {
                    pins.digitalWritePin(DigitalPin.P1, this.Dout);
                } else if (this.grove == GrovePort.P2) {
                    pins.digitalWritePin(DigitalPin.P2, this.Dout);
                } else if (this.grove == GrovePort.P8) {
                    pins.digitalWritePin(DigitalPin.P8, this.Dout);
                } else if (this.grove == GrovePort.P16) {
                    pins.digitalWritePin(DigitalPin.P16, this.Dout);
                }
            }
        }

        select_analog_port(isRead: boolean) {
            if (isRead == true) {
                if (this.analogIO == AnalogPort.P0) {
                    this.Ain = pins.analogReadPin(AnalogPin.P0);
                } else if (this.analogIO == AnalogPort.P1) {
                    this.Ain = pins.analogReadPin(AnalogPin.P1);
                } else if (this.analogIO == AnalogPort.P2) {
                    this.Ain = pins.analogReadPin(AnalogPin.P2);
                }
            } if (isRead == false) {
                if (this.analogIO == AnalogPort.P0) {
                    pins.analogWritePin(AnalogPin.P0, this.Aout);
                } else if (this.analogIO == AnalogPort.P1) {
                    pins.analogWritePin(AnalogPin.P1, this.Aout);
                } else if (this.analogIO == AnalogPort.P2) {
                    pins.analogWritePin(AnalogPin.P2, this.Aout);
                }
            }
        }

        /**
        * read the value of a digital input
        */
        //% blockId=read_Din_value
        //% block="digital read pin $Din"
        //% Din.fieldEditor="gridpicker"
        //% Din.fieldOptions.width=200
        //% Din.fieldOptions.columns=3
        //% group="Digital"
        /**measureInCentimeters(pin: DigitalPin): number {
            let duration = 0;
            let RangeInCentimeters = 0;

            pins.digitalWritePin(pin, 0);
            control.waitMicros(2);
            pins.digitalWritePin(pin, 1);
            control.waitMicros(20);
            pins.digitalWritePin(pin, 0);
            duration = pins.pulseIn(pin, PulseValue.High, 50000); // Max duration 50 ms

            RangeInCentimeters = duration * 153 / 29 / 2 / 100;

            if (RangeInCentimeters > 0) distanceBackup = RangeInCentimeters;
            else RangeInCentimeters = distanceBackup;

            basic.pause(50);

            return RangeInCentimeters;
        }/

        /**
        * read the value of a digital input
        */
        //% blockId=read_Din_value
        //% block="digital read pin $this.grove"
        //% Din.fieldEditor="gridpicker"
        //% Din.fieldOptions.width=200
        //% Din.fieldOptions.columns=3
        //% group="Digital"
        read_Din_value(): number {
            let Din_stat: number;
            this.select_grove_port(true);
            Din_stat = this.Din;
            return Din_stat;
        }
    }
}