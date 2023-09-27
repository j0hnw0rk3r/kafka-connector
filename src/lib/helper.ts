// To pause or sleep
export const sleep = (sec: number) => {
    return new Promise<void>(resolve => setTimeout(() => resolve(), sec * 1000))
}