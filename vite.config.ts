import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import styleImport, {VantResolver} from '@vant/auto-import-resolver';

export default {
    plugins: [
        vue(),
        Components({
            resolvers: [VantResolver()],
        }),
        // styleImport({
        //     resolves: [VantResolver()],
        //     libs: [
        //         {
        //             libraryName: 'vant',
        //             esModule: true,
        //             resolveStyle: name => `../es/${name}/style`
        //         }
        //     ]
        //
        // })

    ],
};



