export function useWait(ms: number, callback: () => void): void {
    setTimeout(callback, ms);
}