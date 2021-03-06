from rest_framework import serializers
from apps.accounts.models import User
from apps.profile.models import Profile, ChildProfile, ProjectInterest


def get_child_profile(user):
    result = {}
    child_profile = ChildProfile.objects.filter(user_id=user)
    if child_profile:
        child_profile = child_profile[0]
        child_profile_serializer = ChildProfileSerializer(child_profile)
        result.update(child_profile_serializer.data)
    return result


class ProfileSerializer(serializers.ModelSerializer):
    # automatically relates the data to the 'name' field of the project interest table.
    project_interest = serializers.SlugRelatedField(many=True, read_only=False, slug_field='name', queryset=ProjectInterest.objects.all())

    class Meta:
        model = Profile
        fields = ('address', 'mobile', 'profile_pic', 'cover_pic', 'about_me', 'favorite_thing', 'dream', 'super_powers',
                  'support', 'user', 'project_interest')
        read_only_fields = ['user']

    @property
    def data(self):
        result = super().data
        request_here = self.context.get('request')
        if request_here:
            profile_pic = result.pop('profile_pic')
            cover_pic = result.pop('cover_pic')
            if profile_pic:
                profile_pic = request_here.build_absolute_uri(profile_pic)
                result.update({"profile_pic": profile_pic})
            else:
                result.update({"profile_pic": ""})
            if cover_pic:
                cover_pic = request_here.build_absolute_uri(cover_pic)
                result.update({"cover_pic": cover_pic})
            else:
                result.update({"cover_pic": ""})

            # passing the user details to the child serializer to fetch children of parent user
            result.update(get_child_profile(result.pop('user')))
        return result


class ChildProfileSerializer(serializers.ModelSerializer):
    parent = serializers.PrimaryKeyRelatedField(many=False, read_only=False, queryset=User.objects.all())
    user = serializers.PrimaryKeyRelatedField(many=False, read_only=False, queryset=User.objects.all())

    class Meta:
        model = ChildProfile
        fields = ('school', 'school_grade', 'parent', 'user')

    @property
    def data(self):
        result = super().data
        result.pop('parent')
        result.pop('user')
        return result