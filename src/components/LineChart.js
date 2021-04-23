import React from 'react'
import { Line } from 'react-chartjs-2';

export default function LineChart({ countryMonth }) {
    return (
        <div>
            <Line 
                data={{
                    labels: countryMonth.map(month => { return month.Date.split('T')[0]}),
                    datasets: [{
                        label: 'Daily Cases',
                        data: countryMonth.map(month => {return month.Cases}),
                        backgroundColor: 'transparent',
                        borderColor: '#000',
                        pointBackgroundColor: '#000'
                    }]
                }}
                height={400}
                width={600}
                options={{
                    maintainAspectRatio: false,
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                suggestedMax: Math.max(...countryMonth.map(month => {return month.Cases })) * 2,
                            }
                        }
                    ]
                    }
                }}
            />
        </div>
    )
}
