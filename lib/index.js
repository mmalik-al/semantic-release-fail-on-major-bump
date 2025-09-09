function isTruthyEnv(value) {
    if (!value) return false;
    const v = String(value).trim().toLowerCase();
    return v === '1' || v === 'true' || v === 'yes' || v === 'on';
}

function verifyRelease(pluginConfig = {}, context = {}) {
    const env = (context && context.env) || process.env || {};
    const disableEnvVarName = pluginConfig.disableEnvVar || 'FAIL_ON_MAJOR_BUMP';
    const disabled = isTruthyEnv(env[disableEnvVarName]);

    if (disabled && context.nextRelease && context.nextRelease.type === 'major') {
        throw new Error("The next release is a major bump and it is not allowed.");
    }
}

module.exports = { verifyRelease };
