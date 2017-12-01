<template>
<div class="general-view">
    <div class="x-bg" :class="iconClassName"></div>
    <div class="general-view-count">
        <strong :class="className" v-cloak :id="idName">{{ startVal }}</strong><span :class="className" class="unit">{{ unit }}</span>
        <!-- <span v-if="percent" class="percent text-color-green">{{percent}}%</span> -->
    </div>
    <div class="general-view-name">{{introText}}</div>
</div>
</template>
<script>
import CountUp from 'countup';
function transformValue (value) {
    let endVal = 0;
    let unit = '';
    let flag = value < 0 ? true : false;
    let val = Math.abs(value)
    if (val < 10000) {
        endVal = val;
        unit = '元';
    } else if (val >= 10000 && val < 100000000) {
        endVal = val / 10000;
        unit = '万元';
    } else if (val >= 100000000 && val < 100000000000000) {
        endVal = val / 100000000;
        unit = '亿元';
    } else {
        endVal = val / 100000000000000;
        unit = '万亿元';
    }
    return {
        val: flag ? (endVal*-1) : endVal,
        unit: unit
    };
}
export default {
    data () {
        return {
            unit: '',
            demo: {}
        };
    },
    name: 'generalCount',
    props: {
        idName: String,
        className: String,
        iconClassName: String,
        startVal: {
            type: Number,
            default: 0
        },
        endVal: {
            type: Number,
            required: true
        },
        percent: {
            type: Number,
            default: 0
        },
        decimals: {
            type: Number,
            default: 0
        },
        duration: {
            type: Number,
            default: 2
        },
        delay: {
            type: Number,
            default: 500
        },
        options: {
            type: Object,
            default: () => {
                return {
                    useEasing: true,
                    useGrouping: true,
                    separator: ',',
                    decimal: '.'
                };
            }
        },
        color: String,
        countSize: {
            type: String,
            default: '30px'
        },
        countWeight: {
            type: Number,
            default: 700
        },
        introText: [String, Number]
    },
    mounted () {
        this.$nextTick(() => {
            setTimeout(() => {
                let res = transformValue(this.endVal);
                let endVal = res.val;
                this.unit = res.unit;
                let demo = {};
                this.demo = demo = new CountUp(this.idName, this.startVal, endVal, this.decimals, this.duration, this.options);
                if (!demo.error) {
                    demo.start();
                }
            }, this.delay);
        });
    },
    watch: {
        endVal (val) {
            let res = transformValue(val);
            let endVal = res.val;
            this.unit = res.unit;
            // this.demo.update(endVal);
        }
    }
};
</script>