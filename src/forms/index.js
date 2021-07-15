import React, { useState } from 'react'
import { ImageBackground, ScrollView, TouchableOpacity, Text, TextInput, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import banner from '../../assets/banner.jpg';
import ModalEl from '../modal';

const Form = () => {
    const [isOpen, openModal] = useState(false);
    const [result, setResult] = useState([]);
    const pertanyaan = {
        "sakit_kepala": 'Merasa Sakit Kepala', "malas_bicara": "Merasa Malas Berbicara Tentang Skripsi", "letih_bangun": "Merasa letih ketika bangun pagi", "sulit_kuliah": "Aktifitas perkuliahan saya terasa sulit", "melamun_sendiri": "Melamun Saat Sendiri",
        "lelah_berfikir": "Merasa Lelah Saat Berfikir", "sulit_mikir": "Merasa kesulitan untuk berfikir atau agak lemot untuk berfikir", "lelah": "Kegiatan yang dilakukan terasa melelahkan", "semangat_hilang": "Kehilangan semangat pada apapun", "mual": "saya merasa mual dan / muntah-muntah",
        "berat_badan": "Berat badan saya bertambah atau berkurang ", "selera": "Selera makan saya menurun", "jantung": "Jantung saya berdebar-debar", "tangan_dingin": "Tangan dan / kaki saya dingin saat membahas tugas akhir", "keringat": "Saya mengeluarkan keringat dingin ketika mengerjakan skripsi",
        "insomnia": "Saya tidak dapat tidur / insomnia", "terjaga_malam": "Saya terjaga saat malam hari", "mager": "Saya malas beraktifitas sepanjang hari", "cemas": "Saya sering merasa cemas memikirkan hal tentang pengerjaan skripsi",
        "tremor": "Gerakan otot saya gemetar dan / gelisah tanpa sadar saat mengerjakan skripsi", "ceroboh": "Saya ceroboh", "tersinggung": "Saya merasa mudah tersinggung", "labil": "Suasana hati saya (mood) berubah-ubah",
        "agresif": "sikap saya agresif dan tidak normal", "konsentrasi_mengerjakan": "saya kesulitan berkonsentrasi mengerjakan tugas kuliah", "kualitas": "kualitas tugas yang saya kerjakan menurun", "mulut": "saya merasa mulut saya kering", "perut": "saya merasa perut tidak nyaman",
        "khawatir": "saya merasa khawatir bertemu dosen pembimbing skripsi", "frustasi": "saya merasa tidak berdaya atau frustasi", "motivasi": "saya kehilangan motivasi untuk belajar", "bosan": "saya merasa bosan dengan kehidupan", "kacau": "pkiran saya yang kacau atau kehilangan orientasi",
        "marah": "saya mudah marah", "keputusan": "saya merasa tidak mampu membuat keputusan", "konsentrasi": "saya merasa kesulitan berkonsentrasi saat mengikuti perkuliahan", "panik": "saya mudah panik", "nangis": "saya sering menangis",
        "bundir": "muncul pikiran saya untuk bunuh diri", "lola": "saya kehilangan orientasi waktu / sering tidak tepat waktu / salah jadwal", "bingung": "saya mengalami priode kebingungan", "tegang": "saya merasa tegang", "lupa": "saya mudah lupa",
        "berlebihan": "saya mengkonsumsi makanan atau minuman tertentu berlebihan", "insecure": "saya kehilangan ketertarikan pada penampilan fisik", "murung": "wajah saya tampak murung", "mondir": "saya berjalan mondar mandir", "kronis": "saya melakukan penundaan yang kronis"
    };
    let obj = {};
    const Els = [];
    Object.keys(pertanyaan).map((k, i) => {
        obj[k] = "Tidak Pernah";
    });
    const [body, setBody] = useState({ ...obj, nama: "" });
    Object.keys(pertanyaan).map((k, i) => {
        Els.push(
            <View key={k} style={{ marginTop: 15 }}>
                <Text style={{ color: 'black', fontSize: 18 }}>{(i + 1) + ". " + pertanyaan[k]}</Text>
                <Picker onValueChange={(v) => setBody({ ...body, [k]: v })} selectedValue={body[k]} >
                    <Picker.Item value="Tidak Pernah" label="Tidak Pernah" />
                    <Picker.Item label="Pernah" value="Pernah" />
                    <Picker.Item label="Kadang - kadang" value="Kadang - kadang" />
                    <Picker.Item label="Sering" value="Sering" />
                    <Picker.Item label="Hampir Selalu" value="Hampir Selalu" />
                </Picker>
            </View>
        )
    });


    const sendData = async () => {
        const url = "https://29e70d19ffcd.ngrok.io";
        console.log("BODY \n", body);

        const res = await fetch(url, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(body)
        }).then(res => res.json()).then(res => res).catch(err => console.log(err));

        console.log("Res \n", res);
        let result = []
        Object.keys(res.detail).forEach(v => {
            result.push(
                <View key={v} style={{ paddingVertical: 5, paddingHorizontal: 20, borderBottomColor: '#F6F6F6', borderBottomWidth: 3, marginBottom: 15 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text>{v}</Text>
                        <Text style={{ marginLeft: 30 }}>{res.detail[v].toFixed(2) * 100 + "%"}</Text>
                    </View>
                </View>
            )
        })
        result.push(
            <View key={"_detail_"} style={{ paddingVertical: 5, paddingHorizontal: 20, borderBottomColor: '#F6F6F6', borderBottomWidth: 3, marginBottom: 15 }}>
                <Text>{res.text}</Text>
            </View>
        );

        setResult(result);
        openModal(true)
    }

return (
    <ScrollView >
        <ImageBackground source={banner} style={{ height: 250, justifyContent: 'center' }}>
            <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Ceritakan Gejala Anda Disini</Text>
        </ImageBackground>
        <View style={{ marginTop: -50, backgroundColor: '#F6F6F6', borderRadius: 35, paddingHorizontal: 50 }}>
            <View style={{ marginVertical: 30 }}>
                <View style={{ marginTop: 15 }}>
                    <Text style={{ color: 'black', fontSize: 18 }}>Nama</Text>
                    <TextInput style={{ borderColor: '#334257', borderWidth: 1, marginTop: 15, borderRadius: 15, paddingHorizontal: 15 }} defaultValue={body.nama} onChangeText={(v) => setBody({ ...body, nama: v })} />
                </View>
                {Els.map((k) => k)}
            </View>
            <TouchableOpacity onPress={sendData} style={{ alignSelf: 'center', marginTop: 20, marginBottom: 30, backgroundColor: '#334257', width: 100, paddingVertical: 10, justifyContent: 'center', borderRadius: 25, borderColor: 'red', borderWidth: 1 }}>
                <Text style={{ color: 'white', textAlign: 'center', fontSize: 18 }}>Kirim</Text>
            </TouchableOpacity>
            <ModalEl subtitle={body.nama} title={"Hasil Analisis"} open={isOpen} openModal={openModal} type="list_element" modalData={result} />

        </View>
    </ScrollView>
);
}
export default Form;