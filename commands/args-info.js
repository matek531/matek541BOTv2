module.exports = {
    name: 'args-info',
    description: 'jebac disa xd',
    args: true,
    execute(message, args){
        if(args[0] === 'jebać'){
            return message.channel.send('disa');
        }

        message.channel.send(`Arguments: ${args} \nArguments Length: ${args.length}`);
    },
};