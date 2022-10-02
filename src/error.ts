export type ValidationError = { name: string, reason: string }
export class Errors {

    private errors: ValidationError[] = []

    add(name: string, reason: string) {
        this.errors.push({ name, reason })
        return false
    }

    all() {
        return this.errors
    }

    isFine() {
        return this.errors.length == 0
    }
}