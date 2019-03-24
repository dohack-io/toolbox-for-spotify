export function getAllPages<T>(worker: (offset: number, limit: number, callback: (err: any, result: SpotifyApi.PagingObject<T>) => void) => void) : Promise<T[]> {
    return new Promise<T[]>((resolve, reject) => {
        let items: T[] = [];

        function handler(err: any, result: SpotifyApi.PagingObject<T>) {
            if (err) {
                reject(err);
            } else {
                items = [...items, ...result.items];

                if (result.next != null) {
                    worker(result.offset + result.limit, result.limit, handler);
                } else {
                    resolve(items);
                }
            }
        }
        
        worker(0, 50, handler);
    });
}
