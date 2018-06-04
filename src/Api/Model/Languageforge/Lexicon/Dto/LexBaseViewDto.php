<?php

namespace Api\Model\Languageforge\Lexicon\Dto;

use Api\Model\Languageforge\Lexicon\Command\SendReceiveCommands;
use Api\Model\Languageforge\Lexicon\LexProjectModel;
use Api\Model\Languageforge\Lexicon\LexOptionListListModel;
use Api\Model\Shared\Mapper\JsonEncoder;
use Api\Model\Shared\UserModel;

class LexBaseViewDto
{
    /**
     * @param string $projectId
     * @param string $userId
     * @return array - the DTO array
     */
    public static function encode($projectId, $userId)
    {
        $data = [];
        $user = new UserModel($userId);
        $project = new LexProjectModel($projectId);

        $config = JsonEncoder::encode($project->config);
        $config['inputSystems'] = JsonEncoder::encode($project->inputSystems);
        $data['config'] = $config;

        $interfaceLanguageCode = $project->interfaceLanguageCode;
        if ($user->interfaceLanguageCode) {
            $interfaceLanguageCode = $user->interfaceLanguageCode;
        }

        // comment out at the moment until a refactor can be done that is more efficient (language data in the database?)
        /*
        $options = self::getInterfaceLanguages(APPPATH . 'angular-app/languageforge/lexicon/lang');
        asort($options);    // sort by language name
        $selectInterfaceLanguages = [
            'optionsOrder' => array_keys($options),
            'options' => $options
        ];
        */
        // a stand in for the code above
        $data['interfaceConfig'] = ['userLanguageCode' => $interfaceLanguageCode];
        $data['interfaceConfig']['selectLanguages'] =  [
            'optionsOrder' => ['en', 'th'],
            'options' => [
                'en' => 'English',
                'th' => 'Thai'
            ]
        ];

        $optionlistListModel = new LexOptionListListModel($project);
        $optionlistListModel->read();
        $data['optionlists'] = $optionlistListModel->entries;

        if ($project->hasSendReceive()) {
            $data['sendReceive'] = [];
            $data['sendReceive']['status'] = SendReceiveCommands::getProjectStatus($projectId);
        }

        return $data;
    }

}
