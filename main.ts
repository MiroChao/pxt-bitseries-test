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
        PWMvalue:number;

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

        select_analog_port(mode: number) {
            //read from specified analog pin
            if (mode == 0) {
                if (this.analogIO == AnalogPort.P0) {
                    this.Ain = pins.analogReadPin(AnalogPin.P0);
                } else if (this.analogIO == AnalogPort.P1) {
                    this.Ain = pins.analogReadPin(AnalogPin.P1);
                } else if (this.analogIO == AnalogPort.P2) {
                    this.Ain = pins.analogReadPin(AnalogPin.P2);
                }
            //write value to specified analog pin
            } else if (mode == 1) {
                if (this.analogIO == AnalogPort.P0) {
                    pins.analogWritePin(AnalogPin.P0, this.Aout);
                } else if (this.analogIO == AnalogPort.P1) {
                    pins.analogWritePin(AnalogPin.P1, this.Aout);
                } else if (this.analogIO == AnalogPort.P2) {
                    pins.analogWritePin(AnalogPin.P2, this.Aout);
                }
            // set pwm pusle at specified analog pin
            } else if (mode == 2) {
                if (this.analogIO == AnalogPort.P0) {
                    pins.analogSetPeriod(AnalogPin.P0, this.PWMvalue);
                } else if (this.analogIO == AnalogPort.P1) {
                    pins.analogSetPeriod(AnalogPin.P1, this.PWMvalue);
                } else if (this.analogIO == AnalogPort.P2) {
                    pins.analogSetPeriod(AnalogPin.P2, this.PWMvalue);
                }
            }
        }

        /**
        * read the value of a digital input
        */
        //% blockId=read_Din_value
        //% block="digital read pin $grove"
        //% Din.fieldEditor="gridpicker"
        //% Din.fieldOptions.width=200
        //% Din.fieldOptions.columns=3
        //% group="Digital"
        read_Din_value(grove: GrovePort): number {
            this.grove = grove;
            this.select_grove_port(true);
            return this.Din;
        }

        /**
         * read the status of a digital input
         */
        //% blockId=read_Din_status
        //% block="digital pin $grove| is $high"
        //% grove.fieldEditor="gridpicker"
        //% grove.fieldOptions.width=200
        //% grove.fieldOptions.columns=3
        //% high.shadow="toggleHighLow"
        //% high.defl="true"
        //% group="Digital"
        //% weight=10
        read_Din_status(grove: GrovePort, high: boolean): boolean {
            this.grove = grove;
            this.select_grove_port(true);
            if ((high == true && this.Din == 1) || (high == false && this.Din == 0)) {
                return true;
            } else {
                return false;
            }
        }

        /**
        * set the status of a digital output to high or low
        */
        //% blockId=set_Dout
        //% block="set digital pin $grove| to $high"
        //% grove.fieldEditor="gridpicker"
        //% grove.fieldOptions.width=200
        //% grove.fieldOptions.columns=3
        //% high.shadow="toggleHighLow"
        //% high.defl="true"
        //% group="Digital"
        //% weight=10
        set_Dout(grove: GrovePort, high: boolean) {
            this.grove = grove;
            this.high = high;
            this.select_grove_port(false);
        }

        /**
        * read the analog inputs
        */
        //% blockId=read_Ain
        //% block="analog read pin $analogIO"
        //% analogIO.fieldEditor="gridpicker"
        //% analogIO.fieldOptions.width=200
        //% analogIO.fieldOptions.columns=3
        //% group="Analog"
        //% weight=50
        read_Ain(analogIO: AnalogPort): number {
            this.analogIO = analogIO;
            this.select_analog_port(0);
            return this.Ain;
        }

        /**
        * read the analog inputs and convert the value to the specified range
        */
        //% blockId=convert_Ain
        //% block="map pin $analogIO|to low $low_value|high $high_value"
        //% analogIO.fieldEditor="gridpicker"
        //% analogIO.fieldOptions.width=200
        //% analogIO.fieldOptions.columns=3
        //% group="Analog"
        //% weight=40
        convert_Ain(analogIO: AnalogPort, low_value: number, high_value: number): number {
            this.analogIO = analogIO;
            this.select_analog_port(0);
            return Math.map(this.Ain, 0, 1023, low_value, high_value);
        }

        /**
        * write value to the analog ports
        */
        //% blockId=write_analog
        //% block="analog write pin $analogIO| to $Aout"
        //% analogIO.fieldEditor="gridpicker"
        //% analogIO.fieldOptions.width=200
        //% analogIO.fieldOptions.columns=3
        //% Aout.min=0 value.max=1023
        //% Aout.defl=1023
        //% group="Analog"
        //% weight=30
        write_analog(analogIO: AnalogPort, Aout: number) {
            this.analogIO = analogIO;
            this.Aout = Aout;
            this.select_analog_port(1);
        }

        /**
        * Configure the period of Pulse Width Modulation (PWM) on the specified analog pin to a given value in "microseconds". Before you call this function, you should set the specified pin as analog output using "analog write pin".
        */
        //% blockId=config_PWM
        //% block="analog set period pin $analogIO|(PWM) to (us) $PWMvalue"
        //% analogIO.fieldEditor="gridpicker"
        //% analogIO.fieldOptions.width=200
        //% analogIO.fieldOptions.columns=3
        //% PWMvalue.defl=20000
        //% group="Analog"
        //% weight=20
        config_PWM(analogIO: AnalogPort, PWMvalue: number) {
            this.analogIO = analogIO;
            this.PWMvalue = PWMvalue;
            this.select_analog_port(2);
        }
    }
}