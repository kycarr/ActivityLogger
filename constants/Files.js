import FileSystem from 'react-native-filesystem';

const APP_DIRECTORY = 'activity-logger'
const USER_DIRECTORY = 'users'
const ACTIVITY_DIRECTORY = 'activities'
const LOG_DIRECTORY = 'logs'


export const saveFile = async (path, content, unique = false) => {
    if (!await fileExists(path)) {
        await FileSystem.writeToFile(path, content);
        return
    }

    if (unique) {
        const file = await loadFile(path)
        if (content in file) {
            return
        }
    }
    
    content = content + `\n${content}`
    await FileSystem.writeToFile(path, content);
}

export const loadFile = async (path) => {
    const fileContents = await FileSystem.readFile(path);
    console.log(`read from file: ${fileContents}`);
    return fileContents
}

export const fileExists = async (path) => {
    const fileExists = await FileSystem.fileExists(path);
    console.log(`file exists: ${fileExists}`);

    return fileExists
}