import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, PermissionsAndroid, StyleSheet, ScrollView } from 'react-native'
import RNFS from 'react-native-fs';
import XLSX from 'xlsx';
import moment from 'moment';
import { Table, Row, Rows } from 'react-native-table-component';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

export default function BrandReport(props) {
    const { data, startDate, endDate } = props
    const [reportData, setReportData] = useState([])

    useEffect(() => {
        if (data.length > 0) {

            let temp = []
            data.map((tr, index) => {
                tr.items.forEach((item) => {
                    const isFind = temp.findIndex((te, index) => te.includes(tr.transactionType))
                    console.log('is find ===>', isFind, item)
                    if (isFind >= 0) {
                        let oldData = temp[isFind]
                        let profit = item.dealPrice - item.capitalPrice
                        let newData = [tr.transactionType, oldData[1] + item.quantity, oldData[2] + profit, oldData[3] + item.dealPrice]
                        temp[isFind] = newData
                    } else {
                        temp.push([
                            tr.transactionType,
                            item.quantity,
                            tr.profit,
                            item.dealPrice
                        ])
                    }
                })
            })
            temp.sort((a, b) => b[2] - a[2])
            setReportData(temp)
        }
    }, [startDate, endDate])



    const headerData = [
        "Jenis Transaksi", "Quantity", "Keuntungan", "Total Penjualan"
    ]
    const widthArr = [120, 100, 120, 120,]

    console.log(reportData)


    const saveDataExcell = async () => {
        try {
            const granted = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            ]);
            const readGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
            const writeGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
            if (!readGranted || !writeGranted) {
                console.log('Read and write permissions have not been granted');
                return;
            }
            let data = reportData
            data.unshift(headerData)
            var ws = XLSX.utils.aoa_to_sheet(data);

            var wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Omorfoo");

            const wbout = XLSX.write(wb, { type: 'binary', bookType: "xlsx" });
            var RNFS = require('react-native-fs');
            console.log(granted, RNFS, 'rnfs =======================')
            var path = RNFS.DownloadDirectoryPath + `/omorfo-report-jenistransaksi-from${moment(startDate).format('YYYY-MM-DD')}to${moment(endDate).format('YYYY-MM-DD')}.xlsx`;

            // write the file
            RNFS.writeFile(path, wbout, 'ascii')
                .then((success) => {
                    console.log('FILE WRITTEN!', path, success);
                    alert(path)
                })
                .catch((err) => {
                    console.log(err.message);
                });
        } catch (err) {
            console.warn(err);
        }
    }

    const saveDataPdf = async () => {
        let header = ``
        headerData.map((item) => {
            header += `<th>${item}</th>`
        })
        let data = ``

        reportData.map((tr) => {
            let row = `<tr>`
            tr.map((item) => {
                row += `
            <td>${item}</td>`
            })
            row += `</tr>`
            data += row
        })

        const template = `
        <style>
            table {
            font-family: arial, sans-serif;
            border-collapse: collapse;
            width: 100%;
            }

            td, th {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
            }

            tr:nth-child(even) {
            background-color: #dddddd;
            }
        </style>
        <table>
            <tr>
                ${header}
            </tr>
            ${data}
        </table>
        `



        let options = {
            html: template,
            fileName: `omorfo-report-jenistransaksi-from${moment(startDate).format('YYYY-MM-DD')}to${moment(endDate).format('YYYY-MM-DD')}`,
            directory: 'Download',
        };

        let file = await RNHTMLtoPDF.convert(options)
        // console.log(file.filePath);
        alert(file.filePath);
    }
    return (
        <View>
            <View style={styles.layoutButton}>
                <TouchableOpacity onPress={saveDataExcell}
                    style={styles.buttonDownload}
                >
                    <Text>Download Excel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={saveDataPdf}
                    style={styles.buttonDownload}
                >
                    <Text>Download PDF</Text>
                </TouchableOpacity>
            </View>
            <ScrollView horizontal={true}>
                <Table borderStyle={{ borderColor: '#B89AD3' }}>
                    <Row data={headerData} widthArr={widthArr} style={styles.header} textStyle={styles.text} />
                    <Rows data={reportData}
                        widthArr={widthArr}
                        style={styles.row}
                        textStyle={styles.text} />
                </Table>
                {/* <Text>
                    {JSON.stringify(reportData)}
                </Text> */}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    layoutButton: { flexDirection: 'row', justifyContent: 'space-around' },
    header: { height: 50, padding: 5, borderWidth: 1, borderColor: '#B89AD3' },
    text: { textAlign: 'center', fontWeight: '100', marginHorizontal: 5 },
    dataWrapper: { marginTop: -1 },
    row: { padding: 5, borderWidth: 1, borderColor: '#B89AD3' },
    buttonDownload: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        backgroundColor: "#B89AD3",
        width: 180,
        margin: 5,
        justifyContent: 'center',
        flexDirection: 'row',
    }
});