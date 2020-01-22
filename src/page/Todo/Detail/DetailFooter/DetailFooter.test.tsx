import { timeDistance } from './DetailFooter';

test('timeDistance', () => {
    expect(timeDistance(new Date('Tue Jan 21 2020 22:06:59 GMT+0800'), new Date('Tue Jan 21 2020 22:06:59 GMT+0800'))).toEqual('今天');
    expect(timeDistance(new Date('Tue Jan 20 2020 22:06:58 GMT+0800'), new Date('Tue Jan 21 2020 22:06:59 GMT+0800'))).toEqual('昨天');
    expect(timeDistance(new Date('Tue Jan 19 2020 22:06:58 GMT+0800'), new Date('Tue Jan 21 2020 22:06:59 GMT+0800'))).toEqual('前天');
    expect(timeDistance(new Date('Tue Jan 17 2020 22:06:58 GMT+0800'), new Date('Tue Jan 21 2020 22:06:59 GMT+0800'))).toEqual('这周');
    expect(timeDistance(new Date('Tue Jan 14 2020 22:06:58 GMT+0800'), new Date('Tue Jan 21 2020 22:06:59 GMT+0800'))).toEqual('上周');
    expect(timeDistance(new Date('Tue Jan 11 2020 22:06:58 GMT+0800'), new Date('Tue Jan 21 2020 22:06:59 GMT+0800'))).toEqual('2020年01月11号');
})