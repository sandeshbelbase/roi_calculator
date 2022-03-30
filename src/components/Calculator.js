import React from 'react'
import { useState } from 'react';
import { appendErrors, useForm } from 'react-hook-form'
import Custominput from './Custominput'
import Customselect from './Customselect';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const Calculator = () => {

    const defaultValues = {
        select: '',
        volume: '',
        email_market:'',
        open_rate:'',
        cr_rate:'',
        conversion_rate:'',
        average_conv:''
    }

    const schema = yup.object({
        volume: yup.number().typeError('Enter value first').min(1, 'Value must be positive.'),
        email_market: yup.number().typeError('Enter the value first').min(1, 'Value must be positive.'),
        open_rate: yup.number().typeError('Enter the value first').min(1, 'Min % value should be 1.').max(100, 'Max % value is 100.'),
        cr_rate: yup.number().typeError('Enter the value first').min(1, 'Min % value should be 1.').max(100, 'Max % value is 100.'),
        conversion_rate: yup.number().typeError('Enter the value first').min(1, 'Min % value should be 1.').max(100, 'Max % value is 100.'),
        average_conv: yup.number().typeError('Enter the value first').min(1, 'Min value 1.')
    }).required();
     
    const { handleSubmit, control, formState: {errors} } = useForm({ resolver: yupResolver(schema), defaultValues})

    const [opens, setOpens] = useState();
    const [click, setClick] = useState();
    const [conversion, setConversion] = useState();
    const [revenue, setRevenue] = useState();
    const [profit, setProfit] = useState();
    const [breakEven, setBreakEven] = useState();
    // const [noConversion, setNoConversion] = useState();
    const [roi, setRoi] = useState();

    const onSubmit = (values) => {
        // console.log(values)
        const opensValue = (values.open_rate * values.volume)/100;
        setOpens(opensValue);
        const clickValue = (values.cr_rate/100) * opensValue;
        setClick(clickValue);
        const conversionValue =(values.conversion_rate/100)* clickValue;
        setConversion(conversionValue);
        const revenueValue = conversionValue* values.average_conv;
        setRevenue(revenueValue)
        const profitValue = revenueValue - values.email_market;
        setProfit(profitValue)
        const breakEvenvalue = values.email_market/values.average_conv;
        setBreakEven(breakEvenvalue)
        // const numOfConversion =()
        const roiValue =((profitValue/values.email_market)*100);
        setRoi(roiValue);
    }

    const formSubmitted = ()=>{

    }

    const options=[
        {
            label: "$ USD",
            value: "usd"
        },
        {
            label: "£ POUND",
            value: "pound"
        },
        {
            label: "€ EURO",
            value: "euro"
        }
    ]


  return (
    <>
        <div className='container'>
            <div className='row col-md-10 offset-md-1'>
            <div className="title">
                <h2>Email Marketing ROI Calculator</h2> <br />
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, 
                lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent.</p>
            </div>

                <div className='main_wrap'>
                    <div className="row">
                            <div className="col-lg-6 col-md-12">
                                <form class="roi_form" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="field_content">
                                    <h3> Currency</h3>
                                    <p>Choose the currency you’d like to use to calculate
                                            your email marketing ROI.</p>
                                    </div>
                                <div className='currency'>
                                <Customselect name="select" options={options} control={control}/>
                                </div>
                                    <div className="field_content">
                                        <h3> Email Send Volume</h3>
                                        <p>Enter the total number of subscribers that your
                                        email marketing campaign is sent to.</p>
                                    </div>
                                    <div className="dollar">
                                        <Custominput name = "volume" control={control}/>
                                        <p>{errors.volume?.message}</p>
                                    </div>
                                    <div className="field_content">
                                        <h3>Cost of Email Marketing Campaign</h3>
                                        <p>Enter the cost for sending this single campaign.
                                            (Divide your monthly cost by the total campaigns
                                                sent per month.)</p>
                                    </div>
                                    <div className="dollar">
                                        <Custominput name = "email_market" control={control}/>
                                        <p>{errors.email_market ?.message}</p>
                                    </div>
                                    <div className="field_content">
                                        <h3>Open Rate</h3>
                                        <p>Enter the percentage of people, on average, that open
                                            your emails</p>
                                    </div>
                                    <div className="dollar">
                                        <Custominput placeholder="%" name = "open_rate" control={control}/>
                                        <p>{errors.open_rate?.message}</p>
                                    </div>
                                    <div className="field_content">
                                        <h3> Click-Through Rate</h3>
                                        <p>Enter the percentage of subscribers who
                                            clicked through your email campaign call to action.</p>
                                    </div>
                                    <div className="dollar">
                                        <Custominput placeholder="%" name = "cr_rate" control={control}/><br/>
                                        <p>{errors.cr_rate?.message}</p>
                                    </div>
                                    <div className="field_content">
                                        <h3> Conversion Rate</h3>
                                        <p>Enter the percentage of people, on average, that click 
                        on links in your email</p>
                                    </div>
                                    <div className="dollar">
                                        <Custominput placeholder="%" name = "conversion_rate" control={control}/>
                                        <p>{errors.conversion_rate?.message}</p>
                                    </div>
                                    <div className="field_content">
                                        <h3>Average Value of a conversion</h3>
                                        <p>Enter the average spend per customer (ASC) 
                        (or average order value as it’s known in Google Analytics).</p>
                                    </div>
                                    <div className="dollar">
                                        <Custominput name = "average_conv" control={control}/>
                                        <p>{errors.average_conv?.message}</p>
                                    </div>
                                    <button class="sub" type='submit' onSubmit={formSubmitted}>CALCULATE</button>
                                </form>
                            </div>
                            <div className="col-lg-6 col-md-12">
                                <div className="results">
                                    <h2>RESULTS</h2>
                                    <div className='result_field'>
                                            <p>Total Opens</p>
                                            <span>{opens}</span>
                                    </div>
                                    <div className='result_field'>
                                            <p>Total Clicks</p>
                                            <span>{click}</span>
                                    </div>
                                    <div className='result_field'>
                                            <p>Total Conversion</p>
                                            <span>{conversion}</span>
                                    </div>
                                    <div className='result_field'>
                                            <p>Total Revenue</p>
                                            <span>{revenue}</span>
                                    </div>
                                    <div className='result_field'>
                                            <p>Total Profit</p>
                                            <span>{profit}</span>
                                    </div>
                                    <div className='result_field'>
                                            <p>Conversion to Break Even</p>
                                            <span>{breakEven}</span>
                                    </div>
                                    <div className='result_field'>
                                            <p>Number of Conversions</p>
                                            <span>--</span>
                                    </div>
                        
                                    <div className='roi'>
                                            <p>ROI%</p>
                                            <span>{roi}</span>
                                    </div>
                                </div>
                            </div>
                        
                    </div>
                </div>
            

            </div>
            
           
        </div>
    </>
  )
}

export default Calculator