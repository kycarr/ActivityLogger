import FileSystem from 'react-native-filesystem';

export const UPDATE_INTERVAL = 500

const APP_DIRECTORY = 'activity-logger'
const USER_DIRECTORY = 'users'
const ACTIVITY_DIRECTORY = 'activities'
const LOG_DIRECTORY = 'logs'

export const round = (n) => {
    if (!n) {
        return 0;
    }
    return Math.floor(n * 100) / 100;
}


export const saveUser = async (user) => {
    const path = `${APP_DIRECTORY}/${USER_DIRECTORY}/users.txt`
    await saveFile(path, user, true)
}

export const loadUsers = async () => {
    const path = `${APP_DIRECTORY}/${USER_DIRECTORY}/file.txt`
    return await loadFile(path)
}

export const saveActivity = async (activity) => {
    const path = `${APP_DIRECTORY}/${ACTIVITY_DIRECTORY}/file.txt`
    await saveFile(path, user, true)
}
export const loadActivities = async() => {
    const path = `${APP_DIRECTORY}/${ACTIVITY_DIRECTORY}/file.txt`
    return await loadFile(path)
}


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