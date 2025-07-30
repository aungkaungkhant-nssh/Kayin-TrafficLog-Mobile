import { getOffenseCases } from '@/api/offense-case';
import { AlertModal } from '@/components/ui/AlertModal';
import DateFilter from '@/components/ui/DateFilter';
import ErrorMessage from '@/components/ui/ErrorMessage';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { importJsonData } from '@/database/offenderVehicles/offenderVehicles';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const Import = () => {
    const today = new Date();
    const [state, setState] = useState({
        isLoading: false,
        isSuccess: false
    });
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const [fromDate, setFromDate] = useState(format(today, 'yyyy-MM-dd'));
    const [toDate, setToDate] = useState(format(today, 'yyyy-MM-dd'));

    const handleImport = async () => {
        setState(prev => ({ ...prev, isLoading: true }));

        const resServer = await getOffenseCases(fromDate, toDate);
        console.log(resServer.data.data)
        setState(prev => ({ ...prev, isLoading: false }));
        if (!resServer?.data?.data.length) return;

        const res = await importJsonData(resServer.data.data);
        if (res?.success && resServer.success) {
            setState(prev => ({
                ...prev,
                isLoading: false,
                isSuccess: true,
            }));
        } else {
            setState(prev => ({ ...prev, isLoading: false }));
            setError("အမှားတစ်ခုဖြစ်ပွားခဲ့သည်။ ကျေးဇူးပြု၍ ပြန်လည်ကြိုးစားပါ။");
        }

    };

    if (error) {
        return <ErrorMessage message={error} onDismiss={() => setError(null)} />;
    }

    return (
        <View style={{ padding: 14, flex: 1 }}>
            <AlertModal
                visible={state.isSuccess}
                onCancel={() => setState(prev => ({ ...prev, isSuccess: false }))}
                onConfirm={() => {
                    router.push("/(tabs)");
                    setState(prev => ({ ...prev, isSuccess: false }));
                }}
                message="ဒေတာထည့်ခြင်း အောင်မြင်ပါသည်။"
                confirmText="မူလ စာမျက်နှာ"
                cancelText="ပိတ်မည်"
                icon={<MaterialIcons name="check-circle" size={70} color="#4CAF50" />}
            />
            <DateFilter
                fromDate={fromDate}
                toDate={toDate}
                setFromDate={setFromDate}
                setToDate={setToDate}
            />
            <View style={styles.container}>
                {
                    state.isLoading ? (
                        <LoadingSpinner />
                    ) : (

                        <TouchableOpacity style={styles.uploadBox} onPress={handleImport}>
                            <View style={styles.iconCircle}>
                                <Ionicons name="cloud-upload-outline" size={28} color="#fff" />
                            </View>
                            <Text style={styles.uploadText}>ဒေတာထည့်ရန်</Text>
                        </TouchableOpacity>
                    )
                }
            </View>

        </View>
    );
};

export default Import;


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: '#fdfdfd',
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        fontFamily: 'Myanmar-Bold', // Ensure the font is available in your assets
        marginBottom: 20,
        textAlign: 'center',
        color: '#222',
    },
    uploadBox: {
        borderStyle: 'dashed',
        borderColor: '#000080',
        borderWidth: 2,
        borderRadius: 16,
        paddingVertical: 30,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
        backgroundColor: '#fff',
    },
    iconCircle: {
        backgroundColor: '#000080',
        borderRadius: 50,
        padding: 15,
        marginBottom: 10,
    },
    uploadText: {
        color: '#000080',
        fontSize: 16,
        fontWeight: '500',
    },
    selectedText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    fileList: {
        marginTop: 10,
        marginBottom: 10,
    },
    fileItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    fileName: {
        fontSize: 14,
        flex: 1,
        marginRight: 12,
        color: '#444',
    },
    removeText: {
        color: 'red',
        fontSize: 14,
    },
});
