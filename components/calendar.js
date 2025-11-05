import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import moment from 'moment'
import { Colors, Fonts, Sizes } from '../constant/styles'

const Date = ({ date, onSelectDate, selected }) => {

    const day = moment(date).format('ddd')
    const dayNumber = moment(date).format('D')
    const year = moment(date).format('MMM YY');
    const fullDate = moment(date).format('YYYY-MM-DD')

    return (
        <View style={{ marginHorizontal: Sizes.fixPadding, }}>
            <Text style={{ textAlign: 'center', ...Fonts.grayRegular }}>
                {year}
            </Text>
            <TouchableOpacity
                onPress={() => onSelectDate(fullDate)}
                style={{ alignItems: 'center', marginTop: Sizes.fixPadding - 5.0 }}
            >
                <View
                    style={{
                        ...styles.selectedDateCircle,
                        backgroundColor: selected === fullDate ? Colors.primary : Colors.whiteColor
                    }}
                >
                    <Text style={{ ...Fonts.black16Bold, ...selected === fullDate && { color: Colors.whiteColor } }}>
                        {dayNumber}
                    </Text>
                    <Text style={[{ ...Fonts.blackRegular }, selected === fullDate && { color: Colors.whiteColor }]}>
                        {day}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const Calendar = ({ onSelectDate, selected }) => {
    const [dates, setDates] = useState([])

    const getDates = () => {
        const _dates = []
        for (let i = 0; i < 200; i++) {
            const date = moment().add(i, 'days');
            _dates.push(date)
        }
        setDates(_dates)
    }

    useEffect(() => {
        getDates()
    }, [])

    return (
        <View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                {dates.map((date, index) => (
                    <Date
                        key={index}
                        date={date}
                        onSelectDate={onSelectDate}
                        selected={selected}
                    />
                ))}
            </ScrollView>
        </View>
    )
}

export default Calendar;

const styles = StyleSheet.create({              
    selectedDateCircle: {
        width: 50,
        height: 50,
        borderRadius: 30.0,
        alignItems: 'center',
        justifyContent: 'center',
    }
})